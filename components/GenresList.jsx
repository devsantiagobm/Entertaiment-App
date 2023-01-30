import Link from "next/link"
import { useRouter } from "next/router"

export default function GenresList({ list, category }) {
    const router = useRouter()
    const { pathname } = router
    const isGenresPage = pathname === "/tv/genres/[id]" || pathname === "/movies/genres/[id]"

    return (
        <ul className="genres">
            {
                list.map(({ id, name }) => (
                    <li key={id} >
                        <Link
                            href={`/${category}/genres/${id}`}
                            className={`genres__item ${isGenresPage && Number(router.query.id) === id && "genres__item--active"}`}>
                            {name}
                        </Link>
                    </li>
                ))
            }
        </ul>

    )
}