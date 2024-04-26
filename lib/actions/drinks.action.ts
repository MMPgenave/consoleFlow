"use server";
interface paramsType {
  searchQuery: string;
  filter: string;
}
export async function getDrinks({ searchQuery, filter }: paramsType) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`);
    const result = await response.json();
    return { drinks: result.drinks };
  } catch (error) {
    console.error(error);
  }
}
