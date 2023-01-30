import { useState } from "react"
import {FiSearch as SearchIcon} from "react-icons/fi"
import { useRouter } from "next/router";

export default function SearchBar() {
    const [search, setSearch] = useState("")
    const router = useRouter()
    
    function handleSubmit(e){
        e.preventDefault();
        search !== "" && (router.push(`/search/${search}`))
        setSearch("")
    }

    return (
        <form className="search" autoComplete="off" onSubmit={handleSubmit}>
            <label htmlFor="search" className="search__label">
                <SearchIcon className="search__icon"/>
                <input 
                type="text" 
                name="search"
                id="search"
                value={search}
                
                onChange={e => setSearch(e.currentTarget.value)}
                className="search__input"
                placeholder="Search for movies or TV series"/>
            </label>
        </form>
    )
}