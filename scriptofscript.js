// Existing recipes
const recipes = {
    "Chocolate Chip Cookies": ["flour", "sugar", "butter", "eggs","egg", "chocolate chips"],
    "Classic Brownies": ["butter", "sugar", "eggs","egg", "cocoa powder", "flour"],
    "Vanilla Cupcakes": ["flour", "butter", "sugar", "eggs","egg", "milk", "vanilla"],
    "Fresh Berry Tart": ["tart shell", "berries", "cream", "sugar"],
    "Cinnamon Rolls": ["flour", "butter", "sugar", "cinnamon", "eggs","egg", "milk"],
    "Muffins": ["flour", "butter", "sugar", "eggs","egg", "milk", "fruit"],
    "Breads": ["flour", "yeast", "water", "salt"],
    "Scones": ["flour", "butter", "sugar", "eggs","egg", "cream"],
    "Biscotti": ["flour", "sugar", "eggs","egg", "almonds"],
    "Donuts": ["flour", "sugar", "eggs","egg", "milk", "yeast"],
    "Macarons": ["almond flour", "sugar", "egg whites", "food coloring"],
    "Cheesecakes": ["cream cheese", "sugar", "eggs","egg", "vanilla", "crust"],
    "Galettes": ["flour", "butter", "sugar", "fruit"],
    "Lemon Bars": ["butter", "sugar", "eggs","egg", "lemon juice", "flour"],
    "Eclairs": ["flour", "butter", "sugar", "eggs","egg", "milk", "chocolate"]
};

// Function to find recipes based on ingredients
async function findRecipes() {
    const input = document.getElementById('ingredients-input').value.toLowerCase();
    const ingredients = input.split(',').map(ingredient => ingredient.trim());
    const results = [];

    // Check existing recipes
    for (const [recipe, recipeIngredients] of Object.entries(recipes)) {
        if (ingredients.every(ingredient => recipeIngredients.includes(ingredient))) {
            results.push(recipe);
        }
    }

    // If no results found in existing recipes, check API
    if (results.length === 0) {
        const apiResults = await searchAPI(ingredients);
        results.push(...apiResults);
    }

    displayResults(results);
}

// Function to search Spoonacular API for baking recipes
async function searchAPI(ingredients) {
    const apiKey = '7ac282e3e5554ca5bfcc8c80696f8048'; // Replace with your actual Spoonacular API key
    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(',')}&apiKey=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.map(recipe => recipe.title);
    } catch (error) {
        console.error('Error fetching recipes from API:', error);
        return [];
    }
}

// Function to display results
function displayResults(results) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = results.length > 0 
        ? `<h3>You can make:</h3><ul>${results.map(recipe => {
            // Check if the recipe is in the existing recipes
            if (recipes.hasOwnProperty(recipe)) {
                return `<li><a href="${recipe.toLowerCase().replace(/ /g, '-')}.html">${recipe}</a></li>`;
            } else {
                return `<li>${recipe}</li>`; // For API results, just display the name
            }
        }).join('')}</ul>` 
        : "<h3>No recipes found with the provided ingredients.</h3>";
}

// JavaScript for scroll animations
document.addEventListener("DOMContentLoaded", function() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const options = {
        root: null,
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing after it becomes visible
            }
        });
    }, options);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Add event listener for Enter key
    const inputField = document.getElementById('ingredients-input');
    inputField.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {  // Check if Enter key is pressed
            event.preventDefault();  // Prevent form submission (if in a form)
            findRecipes();  // Trigger the search
        }
    });
});
