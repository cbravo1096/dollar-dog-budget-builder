// --- GAME CONSTANTS / DYNAMIC STATE ---
const MANDATORY_NEEDS = 3.00;
const MINIMUM_SAVE_GOAL = 5.00;
const MAX_STEPS = 4;
let totalAllowance = 20.00;

const SPENDING_ITEMS = [
    { id: 1, name: "Gourmet Treat 🍖", price: 2.00 },
    { id: 2, name: "Chew Toy 🎾", price: 4.00 },
    { id: 3, name: "New Leash (Want)", price: 6.00 },
    { id: 4, name: "Big Bone (Mega-Want)", price: 8.00 }
];

let currentStep = 1;
let cartItems = {};
let saveAmount = 5.00;
let shareAmount = 0.00;

// --- DOM Elements ---
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

function updateCart(itemId, delta) {
    const currentQty = cartItems[itemId] || 0;
    const newQty = Math.max(0, currentQty + delta);
    cartItems[itemId] = newQty;
    renderShoppingList();
    updateGame(false);
}

function calculateCartTotal() {
    let total = 0;
    SPENDING_ITEMS.forEach(item => {
        total += (cartItems[item.id] || 0) * item.price;
    });
    return parseFloat(total.toFixed(2));
}

function alertMessage(message, type) {
    const originalHTML = finalStatusElement.innerHTML;
    const originalClass = finalStatusElement.className;
    finalStatusElement.className = 'mt-8 p-6 text-center text-white rounded-xl transition-all duration-300';
    if (type === 'success') finalStatusElement.classList.add('success-bg');
    if (type === 'error') finalStatusElement.classList.add('error-bg');
    if (type === 'warning') finalStatusElement.classList.add('warning-bg');
    finalStatusElement.innerHTML = `<p class="text-xl font-bold">${message}</p>`;
    setTimeout(() => {
        finalStatusElement.className = originalClass;
        finalStatusElement.innerHTML = originalHTML;
    }, 1500);
}

function runConfetti() {
    finalStatusElement.classList.add('confetti-glow');
    setTimeout(() => { finalStatusElement.classList.remove('confetti-glow'); }, 1000);
}

// --- NAVIGATION ---
function showStep(step) {
    document.querySelectorAll('.step').forEach(el => el.style.display = 'none');
    document.getElementById(`step-${step}`).style.display = 'block';
    currentStep = step;
    backBtn.disabled = (step === 1);
    nextBtn.disabled = (step === MAX_STEPS);
    nextBtn.textContent = (step === MAX_STEPS - 1) ? "Final Check →" : "Next Step →";

    document.querySelectorAll('[id^="progress-"]').forEach((el, index) => {
        el.classList.remove('text-blue-700');
        if (index + 1 === step) el.classList.add('text-blue-700');
        else if (index + 1 < step) el.classList.add('text-green-600', 'line-through');
    });

    updateGame(false);
}

function prevStep() { if (currentStep > 1) showStep(currentStep - 1); }

function nextStep() {
    if (currentStep === MAX_STEPS) return;
    totalAllowance = parseFloat(startingAllowanceInput.value) || 0;
    if (currentStep === 1 && totalAllowance < MANDATORY_NEEDS + MINIMUM_SAVE_GOAL) {
        alertMessage(`You need at least $${(MANDATORY_NEEDS + MINIMUM_SAVE_GOAL).toFixed(2)} to cover fixed needs AND the minimum save goal!`, 'error');
        return;
    }
    if (currentStep === 2) {
        saveAmount = parseFloat(saveInput.value) || 0;
        shareAmount = parseFloat(shareInput.value) || 0;
        const allocatedElsewhere = MANDATORY_NEEDS + saveAmount + shareAmount;
        if (allocatedElsewhere > totalAllowance) {
            alertMessage("Oops! Your SAVE and SHARE amounts are too high. Reduce them!", 'error');
            return;
        }
        if (saveAmount < MINIMUM_SAVE_GOAL) alertMessage(`Just a warning: Dollar Dog wants at least $${MINIMUM_SAVE_GOAL.toFixed(2)} saved!`, 'warning');
    }
    showStep(currentStep + 1);
}

// --- RESET ---
function resetGame() {
    currentStep = 1;
    cartItems = {};
    startingAllowanceInput.value = '20.00';
    saveInput.value = MINIMUM_SAVE_GOAL.toFixed(2);
    shareInput.value = 0.00.toFixed(2);
    totalAllowance = 20.00;
    saveAmount = MINIMUM_SAVE_GOAL;
    shareAmount = 0.00;
    resetButtonContainer.style.display = 'none';
    init();
}

// --- MAIN LOGIC ---
function updateGame(isInputEvent = true) {
    if (currentStep === 1 || isInputEvent) totalAllowance = parseFloat(startingAllowanceInput.value) || 0;
    if (currentStep === 2 || isInputEvent) {
        saveAmount = parseFloat(saveInput.value) || 0;
        shareAmount = parseFloat(shareInput.value) || 0;
    }

    const currentCartTotal = calculateCartTotal();
    const allocatedElsewhere = MANDATORY_NEEDS + saveAmount + shareAmount;
    const spendable = Math.max(0, totalAllowance - allocatedElsewhere);
    spendCalculatedElement.textContent = `$${spendable.toFixed(2)}`;
    currentLimitDisplay.textContent = `$${spendable.toFixed(2)}`;
    cartTotalElement.textContent = `$${currentCartTotal.toFixed(2)}`;

    moneyAfterFixedElement.textContent = `$${Math.max(0, totalAllowance - MANDATORY_NEEDS).toFixed(2)}`;

    // STEP 4 check
    if (currentStep === 4) {
        const remaining = spendable - currentCartTotal;
        if (remaining >= 0) {
            finalStatusElement.className = 'mt-8 p-6 text-center text-white rounded-xl success-bg';
            finalStatusElement.innerHTML = `<p class="text-2xl font-extrabold">Great job! You stayed within budget. 🐾</p>`;
            runConfetti();
        } else {
            finalStatusElement.className = 'mt-8 p-6 text-center text-white rounded-xl error-bg';
            finalStatusElement.innerHTML = `<p class="text-2xl font-extrabold">Uh oh! You overspent by $${Math.abs(remaining).toFixed(2)}. 😬</p>`;
        }
        resetButtonContainer.style.display = 'block';
    }
}

// --- INIT ---
function init() {
    SPENDING_ITEMS.forEach(item => cartItems[item.id] = 0);
    renderShoppingList();
    showStep(1);
}

// Event listeners
startingAllowanceInput.addEventListener('input', () => updateGame());
saveInput.addEventListener('input', () => updateGame());
shareInput.addEventListener('input', () => updateGame());

init();
