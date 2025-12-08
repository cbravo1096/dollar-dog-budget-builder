<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dollar Dog's Budget Builder</title>
    <!-- Load Tailwind CSS --><script src="https://cdn.tailwindcss.com"></script>
    <!-- Load Bubblegum Sans from Google Fonts --><link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&display=swap" rel="stylesheet">
    
    <style>
        /* Typography: Use Bubblegum Sans for all Headings and major text */
        h1, h2, h3, .bubblegum-font {
            font-family: 'Bubblegum Sans', cursive;
            letter-spacing: 0.05em;
        }

        /* Custom styles for the mascot/theme */
        .primary-text { color: #007bff; }
        .success-bg { background-color: #10b981; } /* Emerald Green */
        .error-bg { background-color: #ef4444; } /* Red */
        .warning-bg { background-color: #f59e0b; } /* Amber */

        /* Defined Bone Pattern Background using the provided URL */
        body {
            background-color: #f7f7f7; /* Fallback color */
            background-image: url("https://dollardogkidsclub.com/wp-content/uploads/2023/06/bones-bg.png");
            background-size: 150px 150px;
            background-repeat: repeat;
            background-attachment: fixed; 
        }

        /* Specific background for the main app container to ensure patterns are in the background */
        #app {
            background-color: white; /* Ensure the main app content is on a white background */
        }
        
        /* Ensure the body stretch to fill the viewport */
        .min-h-screen {
            min-height: 100vh;
        }
        /* Step container is hidden by default */
        .step { display: none; }

        /* Simple Confetti-like Animation for Success */
        .confetti-glow {
            animation: pulse-glow 0.5s ease-in-out forwards;
        }

        @keyframes pulse-glow {
            0% { transform: scale(1); box-shadow: none; }
            50% { transform: scale(1.05); box-shadow: 0 0 40px rgba(255, 255, 0, 0.8), 0 0 20px rgba(0, 0, 255, 0.6); }
            100% { transform: scale(1); box-shadow: none; }
        }
    </style>
</head>
<body class="min-h-screen p-4 flex items-center justify-center font-sans">

    <div id="app" class="w-full max-w-2xl rounded-xl shadow-2xl p-6 md:p-10 border-t-8 border-yellow-500">
        <div class="flex flex-col items-center mb-6">
            <!-- Dollar Dog Logo - Using the provided URL -->
            <img src="https://dollardogkidsclub.com/wp-content/uploads/2023/05/dollar-dog-kids-club.png" 
                 alt="Dollar Dog Mascot Logo" class="w-48 h-auto mb-3"/>
            
            <h1 class="text-4xl font-extrabold primary-text text-center bubblegum-font">
                Dollar Dog's Budget Builder
            </h1>
            <p class="text-center text-gray-600 mt-2">
                Help Dollar Dog Build A Budget that Balances!
            </p>
        </div>

        <!-- Progress Indicator --><div class="flex justify-between items-center mb-8 text-sm font-semibold text-gray-500 bubblegum-font">
            <span id="progress-1" class="text-blue-700">1. Income & Goals</span>
            <div class="w-1/4 h-1 bg-gray-200 rounded-full"></div>
            <span id="progress-2">2. Allocation</span>
            <div class="w-1/4 h-1 bg-gray-200 rounded-full"></div>
            <span id="progress-3">3. Shopping</span>
            <div class="w-1/4 h-1 bg-gray-200 rounded-full"></div>
            <span id="progress-4">4. Final Check</span>
        </div>

        <!-- STEP 1: INCOME & FIXED NEEDS (Info) --><div id="step-1" class="step bg-yellow-50 border-2 border-yellow-300 p-6 rounded-xl shadow-md">
            <h2 class="text-2xl font-black text-yellow-800 mb-4 flex items-center bubblegum-font">
                <span class="text-4xl mr-3">1.</span> Welcome, Smart Saver!
            </h2>
            <div class="space-y-4">
                
                <div>
                    <label for="startingAllowanceInput" class="block text-xl font-bold text-gray-700 mb-2">
                        How much money do you have to start with? (e.g., $20.00)
                    </label>
                    <input type="number" id="startingAllowanceInput" min="5" value="20.00" step="1.00"
                           class="mt-1 block w-full rounded-md border-yellow-500 shadow-lg p-3 text-2xl focus:ring-yellow-500 focus:border-yellow-500">
                </div>

                <p class="text-lg font-semibold text-gray-700">First, Dollar Dog must pay his needs.</p>
                <ul class="text-base list-disc list-inside ml-4 space-y-1">
                    <li>Food: <span class="float-right font-semibold">$2.00</span></li>
                    <li>Shelter: <span class="float-right font-semibold">$1.00</span></li>
                    <li>Vet Fund for the Future: <span class="float-right font-semibold">$1.00</span></li>
                </ul>
                <p class="text-xl font-bold border-t pt-2 flex justify-between items-center">
                    <span>Money Leftover:</span> 
                    <span id="moneyAfterFixed" class="text-indigo-600">$16.00</span>
                </p>
                <p class="text-sm text-gray-500 italic">
                    This remaining amount is what you have left to save, share, and spend!
                </p>
            </div>
        </div>

        <!-- STEP 2: ALLOCATION (SAVE & SHARE) --><div id="step-2" class="step border-2 border-blue-300 p-6 rounded-xl shadow-md">
            <h2 class="text-2xl font-black text-blue-700 mb-6 flex items-center bubblegum-font">
                <span class="text-4xl mr-3">2.</span> Allocate SAVE & SHARE
            </h2>
            <div class="space-y-6">
                
                <div>
                    <label for="saveInput" class="block text-xl font-bold text-gray-700 mb-2">
                        SAVE 🏦 (Goal: Put at least $5.00 for your toy!)
                    </label>
                    <input type="number" id="saveInput" min="0" value="5.00" step="0.50"
                           class="mt-1 block w-full rounded-md border-blue-500 shadow-lg p-3 text-2xl focus:ring-blue-500 focus:border-blue-500">
                </div>

                <div>
                    <label for="shareInput" class="block text-xl font-bold text-gray-700 mb-2">
                        SHARE ❤️ (Donation to friends or charity)
                    </label>
                    <input type="number" id="shareInput" min="0" value="0.00" step="0.50"
                           class="mt-1 block w-full rounded-md border-blue-500 shadow-lg p-3 text-2xl focus:ring-blue-500 focus:border-blue-500">
                </div>

                <div class="p-4 bg-red-100 rounded-lg border-2 border-red-400">
                    <p class="font-bold text-red-700 text-lg">Your Maximum Spending Limit:</p>
                    <p id="spendCalculated" class="text-4xl font-extrabold text-red-900 mt-1">$0.00</p>
                    <p class="text-sm text-red-600 italic mt-2">
                        This is the only money left for fun shopping!
                    </p>
                </div>
            </div>
        </div>

        <!-- STEP 3: SHOPPING (SPEND) --><div id="step-3" class="step border-2 border-green-300 p-6 rounded-xl shadow-md">
            <h2 class="text-2xl font-black text-green-700 mb-6 flex items-center bubblegum-font">
                <span class="text-4xl mr-3">3.</span> Fun Shopping!
            </h2>
            
            <p id="spendLimitDisplay" class="text-xl font-bold text-gray-700 mb-4">
                Your SPENDING LIMIT is: <span id="currentLimit" class="text-red-700">$0.00</span>
            </p>

            <!-- Shopping List --><div id="shoppingList" class="space-y-3 mb-6">
                <!-- Items generated by JS --></div>

            <div id="cartStatusBox" class="p-4 bg-gray-100 rounded-lg shadow-inner border-2 border-transparent transition-colors duration-300">
                <p class="font-semibold text-gray-700">Shopping Cart Total:</p>
                <p id="cartTotal" class="text-3xl font-extrabold text-indigo-600 mt-1">$0.00</p>
            </div>
        </div>

        <!-- STEP 4: FINAL CHECK & RESULT --><div id="step-4" class="step border-2 border-indigo-300 p-6 rounded-xl shadow-md">
            <h2 class="text-2xl font-black text-indigo-700 mb-6 flex items-center bubblegum-font">
                <span class="text-4xl mr-3">4.</span> Check the Budget!
            </h2>
            <p class="text-xl font-semibold mb-4">Dollar Dog reviewed your budget:</p>
            <div id="finalStatus" class="mt-4 p-6 text-center text-white rounded-xl transition-all duration-300">
                <p class="text-xl font-bold">Checking budget...</p>
            </div>
            <!-- New button container --><div id="resetButtonContainer" class="mt-6 text-center" style="display: none;">
                <button onclick="resetGame()" class="px-8 py-3 bg-yellow-500 text-white font-black text-lg rounded-full shadow-lg hover:bg-yellow-600 transition transform hover:scale-105">
                    Build Another Budget
                </button>
            </div>
        </div>

        <!-- Navigation Buttons --><div id="navigation" class="flex justify-between mt-8">
            <button id="backBtn" onclick="prevStep()" class="px-6 py-2 bg-gray-300 text-gray-700 font-bold rounded-lg transition hover:bg-gray-400 disabled:opacity-50">
                ← Back
            </button>
            <button id="nextBtn" onclick="nextStep()" class="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg transition hover:bg-blue-600 disabled:opacity-50">
                Next Step →
            </button>
        </div>

    </div>

    <script>
        // --- GAME CONSTANTS / DYNAMIC STATE ---
        const MANDATORY_NEEDS = 4.00; // UPDATED: Food ($2.00) + Shelter ($1.00) + Vet Fund ($1.00) = $4.00
        const MINIMUM_SAVE_GOAL = 5.00;
        const MAX_STEPS = 4;
        let totalAllowance = 20.00; // Dynamic state variable, initialized to default

        // --- SPENDING ITEMS ---
        const SPENDING_ITEMS = [
            { id: 1, name: "Gourmet Treat 🍖", price: 2.00 },
            { id: 2, name: "Chew Toy 🎾", price: 4.00 },
            { id: 3, name: "New Leash (Want)", price: 6.00 },
            { id: 4, name: "Big Bone (Mega-Want)", price: 8.00 }
        ];

        // --- GAME STATE ---
        let currentStep = 1;
        let cartItems = {}; // { itemId: quantity }
        let saveAmount = 5.00;
        let shareAmount = 0.00;

        // --- DOM ELEMENTS ---
        const startingAllowanceInput = document.getElementById('startingAllowanceInput');
        const moneyAfterFixedElement = document.getElementById('moneyAfterFixed');
        const saveInput = document.getElementById('saveInput');
        const shareInput = document.getElementById('shareInput');
        const spendCalculatedElement = document.getElementById('spendCalculated');
        const cartTotalElement = document.getElementById('cartTotal');
        const shoppingListElement = document.getElementById('shoppingList');
        const finalStatusElement = document.getElementById('finalStatus');
        const backBtn = document.getElementById('backBtn');
        const nextBtn = document.getElementById('nextBtn');
        const currentLimitDisplay = document.getElementById('currentLimit');
        const resetButtonContainer = document.getElementById('resetButtonContainer');
        const cartStatusBox = document.getElementById('cartStatusBox');

        // --- UTILITY FUNCTIONS ---

        // Function to render the shopping list controls
        function renderShoppingList() {
            shoppingListElement.innerHTML = SPENDING_ITEMS.map(item => `
                <div class="flex justify-between items-center p-3 bg-white border rounded-lg hover:shadow-md">
                    <p class="font-medium">${item.name} <span class="text-sm text-gray-500">($${item.price.toFixed(2)})</span></p>
                    <div class="flex items-center space-x-2">
                        <button onclick="updateCart(${item.id}, -1)" class="px-3 py-1 bg-red-500 text-white rounded-full text-lg font-bold hover:bg-red-600 transition disabled:opacity-50" ${cartItems[item.id] > 0 ? '' : 'disabled'}>-</button>
                        <span id="qty-${item.id}" class="w-6 text-center font-bold">${cartItems[item.id] || 0}</span>
                        <button onclick="updateCart(${item.id}, 1)" class="px-3 py-1 bg-green-500 text-white rounded-full text-lg font-bold hover:bg-green-600 transition">+</button>
                    </div>
                </div>
            `).join('');
        }

        // Function to update the cart quantity (Removed strict overspend check)
        function updateCart(itemId, delta) {
            const currentQty = cartItems[itemId] || 0;
            const newQty = Math.max(0, currentQty + delta);
            
            // Allow user to go over budget, but update the state visually
            if (delta > 0 || delta < 0) {
                 cartItems[itemId] = newQty;
            }

            renderShoppingList(); // Re-render to update button disabled state
            updateGame(false); // Update game state without triggering navigation validation
        }
        
        // Function to calculate the current cart total
        function calculateCartTotal() {
            let total = 0;
            SPENDING_ITEMS.forEach(item => {
                const qty = cartItems[item.id] || 0;
                total += qty * item.price;
            });
            // Round to 2 decimal places to avoid float errors
            return parseFloat(total.toFixed(2));
        }

        // Function for custom alert messages (replacing browser alerts)
        function alertMessage(message, type) {
            // Overrides final status briefly for constraint violations
            const originalHTML = finalStatusElement.innerHTML;
            const originalClass = finalStatusElement.className;

            finalStatusElement.className = 'mt-8 p-6 text-center text-white rounded-xl transition-all duration-300';
            
            if (type === 'success') {
                finalStatusElement.classList.add('success-bg');
            } else if (type === 'error') {
                finalStatusElement.classList.add('error-bg');
            } else if (type === 'warning') {
                finalStatusElement.classList.add('warning-bg');
            }

            finalStatusElement.innerHTML = `<p class="text-xl font-bold">${message}</p>`;
            
            // Revert to main game status after a short delay
            setTimeout(() => {
                finalStatusElement.className = originalClass;
                finalStatusElement.innerHTML = originalHTML;
            }, 1500); 
        }

        // --- CONFETTI ANIMATION (Simple CSS based) ---
        function runConfetti() {
            // Simple visual effect by briefly expanding and changing the success container
            finalStatusElement.classList.add('confetti-glow');
            
            // Remove class after animation finishes (1000ms from CSS)
            setTimeout(() => {
                finalStatusElement.classList.remove('confetti-glow');
            }, 1000);
        }

        // --- NAVIGATION & STEP CONTROL ---

        function showStep(step) {
            // Hide all steps
            document.querySelectorAll('.step').forEach(el => el.style.display = 'none');
            // Show current step
            document.getElementById(`step-${step}`).style.display = 'block';

            // Update state
            currentStep = step;

            // Update navigation buttons
            // Back button is only disabled on Step 1. It is enabled on Step 4 to allow correction.
            backBtn.disabled = (step === 1);
            nextBtn.disabled = (step === MAX_STEPS);
            nextBtn.textContent = (step === MAX_STEPS - 1) ? "Final Check →" : "Next Step →";
            
            // Update progress indicator
            document.querySelectorAll('[id^="progress-"]').forEach((el, index) => {
                el.classList.remove('text-blue-700');
                if (index + 1 === step) {
                    el.classList.add('text-blue-700');
                } else if (index + 1 < step) {
                     el.classList.add('text-green-600', 'line-through');
                } else {
                    el.classList.remove('text-green-600', 'line-through');
                }
            });

            // Perform game update relevant to the current step (non-validation)
            updateGame(false);
        }

        function prevStep() {
            if (currentStep > 1) {
                showStep(currentStep - 1);
            }
        }

        function nextStep() {
            if (currentStep === MAX_STEPS) return;
            
            // Re-read allowance before validating/calculating next steps
            totalAllowance = parseFloat(startingAllowanceInput.value) || 0;

            // Validation Logic before moving forward
            if (currentStep === 1) {
                 if (totalAllowance < MANDATORY_NEEDS + MINIMUM_SAVE_GOAL) {
                     alertMessage(`You need at least $${(MANDATORY_NEEDS + MINIMUM_SAVE_GOAL).toFixed(2)} to cover fixed needs AND the minimum save goal!`, 'error');
                     return;
                }
            }


            if (currentStep === 2) {
                // Step 2 Validation: Must allocate correctly (Save/Share <= Money After Fixed Needs)
                const allocatedElsewhere = MANDATORY_NEEDS + saveAmount + shareAmount;
                if (allocatedElsewhere > totalAllowance) { // Use dynamic allowance
                    alertMessage("Oops! Your SAVE and SHARE amounts are too high. Reduce them!", 'error');
                    return;
                }
                // Optional: Warn if minimum save goal isn't met yet
                if (saveAmount < MINIMUM_SAVE_GOAL) {
                    alertMessage(`Just a warning: Dollar Dog wants at least $${MINIMUM_SAVE_GOAL.toFixed(2)} saved!`, 'warning');
                    // Allow to proceed, but provide feedback.
                }
            }

            // No validation required for step 3, as overspending is allowed to demonstrate consequences.

            // Move to the next step
            showStep(currentStep + 1);
        }

        // --- RESET GAME ---
        function resetGame() {
            // Reset state
            currentStep = 1;
            cartItems = {};
            // Set input values back to defaults
            startingAllowanceInput.value = '20.00';
            saveInput.value = MINIMUM_SAVE_GOAL.toFixed(2);
            shareInput.value = 0.00.toFixed(2);
            // Ensure internal state matches new inputs
            totalAllowance = 20.00;
            saveAmount = MINIMUM_SAVE_GOAL;
            shareAmount = 0.00;
            
            resetButtonContainer.style.display = 'none';

            // Re-initialize the game
            init();
        }

        // --- MAIN GAME LOGIC (runs on input change and step change) ---

        function updateGame(isInputEvent = true) {
            // 1. Get dynamic allowance and allocation amounts
            if (currentStep === 1 || isInputEvent) {
                totalAllowance = parseFloat(startingAllowanceInput.value) || 0;
            }
            if (currentStep === 2 || isInputEvent) {
                saveAmount = parseFloat(saveInput.value) || 0;
                shareAmount = parseFloat(shareInput.value) || 0;
            }

            const currentCartTotal = calculateCartTotal();
            
            // 2. Calculate remaining budget for SPEND category
            const allocatedElsewhere = MANDATORY_NEEDS + saveAmount + shareAmount;
            const remainingForSpend = totalAllowance - allocatedElsewhere;
            const moneyAfterFixed = totalAllowance - MANDATORY_NEEDS;

            // 3. Update displays (relevant for all steps)
            moneyAfterFixedElement.textContent = `$${Math.max(0, moneyAfterFixed).toFixed(2)}`;
            spendCalculatedElement.textContent = `$${Math.max(0, remainingForSpend).toFixed(2)}`;
            currentLimitDisplay.textContent = `$${Math.max(0, remainingForSpend).toFixed(2)}`;
            cartTotalElement.textContent = `$${currentCartTotal.toFixed(2)}`;
            
            // 3b. Shopping Cart Visual Feedback (Step 3 only)
            if (currentStep === 3) {
                const spendLimit = parseFloat(currentLimitDisplay.textContent.replace('$', ''));
                cartStatusBox.classList.remove('border-red-500', 'border-green-500', 'border-transparent');
                cartTotalElement.classList.remove('text-red-600', 'text-green-600');

                if (currentCartTotal > spendLimit) {
                    cartStatusBox.classList.add('border-4', 'border-red-500');
                    cartTotalElement.classList.add('text-red-600');
                } else {
                    cartStatusBox.classList.add('border-4', 'border-green-500');
                    cartTotalElement.classList.add('text-green-600');
                }
            } else {
                // Reset cart status for other steps
                 cartStatusBox.classList.remove('border-4', 'border-red-500', 'border-green-500');
                 cartTotalElement.classList.remove('text-red-600', 'text-green-600');
            }


            // 4. Final Check (Only if on Step 4)
            if (currentStep === MAX_STEPS) {
                const totalAllocated = allocatedElsewhere + currentCartTotal;
                // Use a helper function for precise float subtraction
                const remainingBalance = parseFloat((totalAllowance - totalAllocated).toFixed(2));
                
                finalStatusElement.className = 'mt-8 p-6 text-center text-white rounded-xl transition-all duration-300';
                
                // --- Budget Check and Result ---
                resetButtonContainer.style.display = 'none';

                if (remainingBalance < 0) {
                    // FAILURE: Over Budget
                    finalStatusElement.classList.add('error-bg');
                    finalStatusElement.innerHTML = `
                        <p class="text-2xl font-bold">❌ Oops! Dollar Dog spent $${Math.abs(remainingBalance).toFixed(2)} too much!</p>
                        <p class="text-lg mt-2">Go back to adjust your allocations or shopping cart using the 'Back' button below.</p>
                    `;
                    backBtn.disabled = false;
                    nextBtn.disabled = true;

                } else if (remainingBalance > 0) {
                    // WARNING: Under Allocated
                    finalStatusElement.classList.add('warning-bg');
                    finalStatusElement.innerHTML = `
                        <p class="text-2xl font-bold">⚠️ ALMOST THERE! You have $${remainingBalance.toFixed(2)} UNALLOCATED.</p>
                        <p class="text-lg mt-2">Remember, every dollar needs a job! Use the 'Back' button to increase SAVE, SHARE, or SPENDING.</p>
                    `;
                    backBtn.disabled = false;
                    nextBtn.disabled = true;

                } else {
                    // SUCCESS: Balanced Budget (Remaining == 0)
                    if (saveAmount >= MINIMUM_SAVE_GOAL) {
                        // Success AND Goal Met
                        finalStatusElement.classList.add('success-bg');
                        finalStatusElement.innerHTML = `
                            <p class="text-2xl font-bold">WOOF! Your budget is doggone perfect.</p>
                            <p class="text-lg mt-2">You saved $${saveAmount.toFixed(2)} (Goal Met!) and made the balance exactly zero!</p>
                        `;
                        runConfetti();
                        resetButtonContainer.style.display = 'block';
                        backBtn.disabled = true; // Disable back when completely done
                        nextBtn.disabled = true;

                    } else {
                        // Balanced BUT Goal NOT Met
                        finalStatusElement.classList.add('error-bg');
                        finalStatusElement.innerHTML = `
                            <p class="text-2xl font-bold">❌ BALANCE ACHIEVED, BUT GOAL MISSED.</p>
                            <p class="text-lg mt-2">The budget is balanced, but you only saved $${saveAmount.toFixed(2)}. Dollar Dog needs at least $${MINIMUM_SAVE_GOAL.toFixed(2)}! Use the 'Back' button to fix it.</p>
                        `;
                        backBtn.disabled = false;
                        nextBtn.disabled = true;
                    }
                }
            }
        }

        // --- INITIALIZATION ---
        function init() {
            // Initialize cart items
            SPENDING_ITEMS.forEach(item => cartItems[item.id] = 0);
            
            // Set up listeners for inputs
            startingAllowanceInput.addEventListener('input', () => updateGame(true));
            saveInput.addEventListener('input', () => updateGame(true));
            shareInput.addEventListener('input', () => updateGame(true));
            
            // Render initial list and show the first step
            renderShoppingList();
            showStep(1);
        }

        // Start the game on load
        window.onload = init;
    </script>

</body>
</html>