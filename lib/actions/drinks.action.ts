"use server";
interface paramsType {
  searchQuery: string | undefined;
  filter: string | undefined;
}
export async function getDrinks({ searchQuery, filter }: paramsType) {
  try {
    console.log(`searchQuery:${searchQuery}
    filter:${filter}`);
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`);
    const result = await response.json();
    return { drinks: result.drinks };
  } catch (error) {
    console.error(error);
  }
}
