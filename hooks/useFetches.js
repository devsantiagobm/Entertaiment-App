

export default function useFetches(urls, local = false) {
    return local
        ? urls.map(url => (
            fetch(process.env.API_URL + url).then(res => res.json())
        ))
        : urls.map(url => (
            fetch(url).then(res => res.json())
        ))
}