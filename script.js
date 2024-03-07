const ApiTestKey = '1'

const DrinkContainer = document.getElementById('drink-container');


document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the API for categories
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
        .then(response => response.json())
        .then(categoryData => {
            const categoryDropdown = document.getElementById('categoriesDropdown');
            const categoryButton = document.getElementById('categoriesButton');

            categoryData.drinks.forEach(category => {
                const categoryLink = document.createElement('a');
                categoryLink.href = '#'; 
                categoryLink.textContent = category.strCategory;
                categoryDropdown.appendChild(categoryLink);
            });

            categoryButton.addEventListener('click', function () {
                categoryDropdown.style.display = (categoryDropdown.style.display === 'block') ? 'none' : 'block';
            });

            document.addEventListener('click', function (event) {
                if (!event.target.matches('#categoriesButton')) {
                    categoryDropdown.style.display = 'none';
                }
            });
        })
        .catch(error => console.error('Error fetching category data:', error));

    // Fetch data from the API for glass
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list')
        .then(response => response.json())
        .then(glassData => {
            const glassDropdown = document.getElementById('glass-dropdown');
            const glassButton = document.getElementById('glass-button');

            glassData.drinks.forEach(glass => {
                const glassLink = document.createElement('a');
                glassLink.href = '#'; 
                glassLink.textContent = glass.strGlass;
                glassDropdown.appendChild(glassLink);
            });

            glassButton.addEventListener('click', function () {
                glassDropdown.style.display = (glassDropdown.style.display === 'block') ? 'none' : 'block';
            });

            document.addEventListener('click', function (event) {
                if (!event.target.matches('#glass-button')) {
                    glassDropdown.style.display = 'none';
                }
            });
        })
        .catch(error => console.error('Error fetching glass data:', error));
    // Fetch data from the API for ingredients
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
        .then(response => response.json())
        .then(ingredientData => {
            const ingredientDropdown = document.getElementById('ing-dropdown-content');
            const ingredientButton = document.getElementById('ing-button');

            ingredientData.drinks.forEach(ingredient => {
                const ingredientLink = document.createElement('a');
                ingredientLink.href = '#';
                ingredientLink.textContent = ingredient.strIngredient1;
                ingredientDropdown.appendChild(ingredientLink);
            });

            ingredientButton.addEventListener('click', function () {
                ingredientDropdown.style.display = (ingredientDropdown.style.display === 'block') ? 'none' : 'block';
            });

            document.addEventListener('click', function (event) {
                if (!event.target.matches('#ing-button')) {
                    ingredientDropdown.style.display = 'none';
                }
            });
        })
        .catch(error => console.error('Error fetching ingredient data:', error));
        
        // Fetch data from the API for alcohol
        fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list')
            .then(response => response.json())
            .then(alcoholData => {
                const alcoholDropdown = document.getElementById('alcohol-dropdown');
                const alcoholButton = document.getElementById('alcohol-button');

                alcoholData.drinks.forEach(alcohol => {
                    const alcoholLink = document.createElement('a');
                    alcoholLink.href = '#';
                    alcoholLink.textContent = alcohol.strAlcoholic;
                    alcoholDropdown.appendChild(alcoholLink);
                });

                alcoholButton.addEventListener('click', function () {
                    alcoholDropdown.style.display = (alcoholDropdown.style.display === 'block') ? 'none' : 'block';
                });

                document.addEventListener('click', function (event) {
                    if (!event.target.matches('#alcohol-button')) {
                        alcoholDropdown.style.display = 'none';
                    }
                });
            })
            .catch(error => console.error('Error fetching alcohol data:', error));
});


document.addEventListener('DOMContentLoaded', function () {
    // Your existing code for fetching and displaying categories...

    // Function to fetch drink data from the API based on the selected category
    async function fetchDrinksByCategory(category) {
        const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.drinks) {
                return data.drinks;
            } else {
                console.error('Error fetching drink data:', data);
                return [];
            }
        } catch (error) {
            console.error('Error fetching drink data:', error);
            return [];
        }
    }

    // Function to render drink cards based on the selected category
    async function renderDrinkCardsByCategory(category) {
        const drinkContainer = document.getElementById('drinkCardContainer');
        drinkContainer.innerHTML = ''; 

        const drinks = await fetchDrinksByCategory(category);

        drinks.forEach(async (drink) => {
            // Fetch additional details for each drink by its ID
            const details = await fetchDrinkDetailsById(drink.idDrink);

            const card = document.createElement('div');
            card.className = 'drink-card';

        card.innerHTML = `
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
            <h2>${drink.strDrink}</h2>
            <p class="instructions"><strong style="font-weight: bold; color: #333;">Instructions:</strong> ${details.strInstructions}</p>
        `;
           card.addEventListener('click', function () {
                openPopup(drink);
            });
            drinkContainer.appendChild(card);
        });
    }

    async function fetchDrinksByIngredient(ingredient) {
        const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.drinks) {
                return data.drinks;
            } else {
                console.error('Error fetching drink data by ingredient:', data);
                return [];
            }
        } catch (error) {
            console.error('Error fetching drink data by ingredient:', error);
            return [];
        }
    }
    // Function to render drink cards based on the selected ingredient
    async function renderDrinkCardsByIngredient(ingredient) {
        const drinkContainer = document.getElementById('drinkCardContainer');
        drinkContainer.innerHTML = '';

        const drinks = await fetchDrinksByIngredient(ingredient);

        drinks.forEach(async (drink) => {
            const details = await fetchDrinkDetailsById(drink.idDrink);

            const card = document.createElement('div');
            card.className = 'drink-card';

            card.innerHTML = `
                <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                <h2>${drink.strDrink}</h2>
                <p class="instructions"><strong style="font-weight: bold; color: #333;">Instructions:</strong> ${details.strInstructions}</p>
            `;

            card.addEventListener('click', function () {
                openPopup(drink);
            });

            drinkContainer.appendChild(card);
        });
    }

    // Function to fetch drink data from the API based on the selected alcohol
    async function fetchDrinksByAlcohol(alcohol) {
        const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alcohol}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.drinks) {
                return data.drinks;
            } else {
                console.error('Error fetching drink data by alcohol:', data);
                return [];
            }
        } catch (error) {
            console.error('Error fetching drink data by alcohol:', error);
            return [];
        }
    }

    // Function to render drink cards based on the selected alcohol
    async function renderDrinkCardsByAlcohol(alcohol) {
        const drinkContainer = document.getElementById('drinkCardContainer');
        drinkContainer.innerHTML = '';

        const drinks = await fetchDrinksByAlcohol(alcohol);

        drinks.forEach(async (drink) => {
            const details = await fetchDrinkDetailsById(drink.idDrink);

            const card = document.createElement('div');
            card.className = 'drink-card';

            card.innerHTML = `
                <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                <h2>${drink.strDrink}</h2>
                <p class="instructions"><strong style="font-weight: bold; color: #333;">Instructions:</strong> ${details.strInstructions}</p>
            `;

            card.addEventListener('click', function () {
                openPopup(drink);
            });

            drinkContainer.appendChild(card);
        });
}

// Event listener for the alcohol dropdown
    document.getElementById('alcohol-dropdown').addEventListener('click', async function (event) {
        if (event.target.tagName === 'A') {
            const selectedAlcohol = event.target.textContent;
            await renderDrinkCardsByAlcohol(selectedAlcohol);
        }
    });

    // Function to fetch drink data from the API based on the selected glass
async function fetchDrinksByGlass(glass) {
    const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.drinks) {
            return data.drinks;
        } else {
            console.error('Error fetching drink data by glass:', data);
            return [];
        }
    } catch (error) {
        console.error('Error fetching drink data by glass:', error);
        return [];
    }
}

    // Function to render drink cards based on the selected glass
    async function renderDrinkCardsByGlass(glass) {
        const drinkContainer = document.getElementById('drinkCardContainer');
        drinkContainer.innerHTML = '';

        const drinks = await fetchDrinksByGlass(glass);

        drinks.forEach(async (drink) => {
            const details = await fetchDrinkDetailsById(drink.idDrink);

            const card = document.createElement('div');
            card.className = 'drink-card';

            card.innerHTML = `
                <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                <h2>${drink.strDrink}</h2>
                <p class="instructions"><strong style="font-weight: bold; color: #333;">Instructions:</strong> ${details.strInstructions}</p>
            `;

            card.addEventListener('click', function () {
                openPopup(drink);
            });

            drinkContainer.appendChild(card);
        });
    }
    // Event listener for the glass dropdown
    document.getElementById('glass-dropdown').addEventListener('click', async function (event) {
        if (event.target.tagName === 'A') {
            const selectedGlass = event.target.textContent;
            await renderDrinkCardsByGlass(selectedGlass);
        }
    });

    // Function to fetch additional details for a drink by its ID
    async function fetchDrinkDetailsById(id) {
        const detailsUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

        try {
            const response = await fetch(detailsUrl);
            const data = await response.json();

            if (data.drinks && data.drinks.length > 0) {
                return data.drinks[0];
            } else {
                console.error('Error fetching drink details:', data);
                return {};
            }
        } catch (error) {
            console.error('Error fetching drink details:', error);
            return {};
        }
    }
   // Function to open the popup with more information
    function openPopup(drink) {
        const modal = document.getElementById('myModal');
        const popupContent = document.getElementById('popupContent');
        popupContent.innerHTML = `
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
            <h2>${drink.strDrink}</h2>
            <p><strong>Glass:</strong> ${drink.strGlass}</p>
            <p><strong>Category:</strong> ${drink.strCategory}</p>
            <p><strong>Alcoholic:</strong> ${drink.strAlcoholic}</p>
            <p><strong>Ingredients:</strong> ${getIngredientsList(drink)}</p>
            <p><strong>Instructions:</strong> ${drink.strInstructions}</p>
        `;
        modal.style.display = 'block';

        // Close the modal when clicking outside of it
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }

    function closePopup() {
        const modal = document.getElementById('myModal');
        modal.style.display = 'none';
    }

        // Function to get the ingredients list
    function getIngredientsList(drink) {
        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
            const ingredient = drink[`strIngredient${i}`];
            const measure = drink[`strMeasure${i}`];
            if (ingredient && measure) {
                ingredients.push(`${measure.trim()} ${ingredient.trim()}`);
            }
        }
        return ingredients.join(', ');
    }


    // Event listener for the categories dropdown
    document.getElementById('categoriesDropdown').addEventListener('click', async function (event) {
        if (event.target.tagName === 'A') {
            const selectedCategory = event.target.textContent;
            await renderDrinkCardsByCategory(selectedCategory);
        }
    });

    // Event listener for the ingredients dropdown
document.getElementById('ing-dropdown-content').addEventListener('click', async function (event) {
    if (event.target.tagName === 'A') {
        const selectedIngredient = event.target.textContent;
        await renderDrinkCardsByIngredient(selectedIngredient);
    }
});
});

