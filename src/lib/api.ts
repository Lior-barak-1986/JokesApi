const url = "https://official-joke-api.appspot.com/jokes/programming/ten"

export const fetchData = async() => {
    const res = await fetch(url);
    return await res.json();
}