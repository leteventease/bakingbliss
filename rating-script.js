document.addEventListener('DOMContentLoaded', () => {
    const ratings = JSON.parse(localStorage.getItem('recipeRatings')) || {};

    document.querySelectorAll('.recipe-item').forEach(item => {
        const recipeName = item.getAttribute('data-recipe');
        const ratingInput = item.querySelector('input[type="range"]');
        const currentRatingSpan = item.querySelector('.current-rating');

        if (ratings[recipeName]) {
            ratingInput.value = ratings[recipeName];
            currentRatingSpan.textContent = ratings[recipeName];
        }

        ratingInput.addEventListener('change', () => {
            const newRating = ratingInput.value;
            ratings[recipeName] = newRating;
            currentRatingSpan.textContent = newRating;
            localStorage.setItem('recipeRatings', JSON.stringify(ratings));
        });
    });
});
