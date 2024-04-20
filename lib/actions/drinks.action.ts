"use server";

export async function getDrinks() {
  try {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=");
    const result = await response.json();
    return { drinks: result.drinks };
  } catch (error) {
    console.error(error);
  }
}
