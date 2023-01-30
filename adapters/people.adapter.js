import { MOVIE_IMAGES_URL } from "../constants"

export default function peopleAdapter(crew) {
    return Array.from(crew).map(people => {
        const image = Boolean(people.profile_path) ? MOVIE_IMAGES_URL + "w300" + people.profile_path : "/person-placeholder.png"

        return (
            {
                image,
                name: people.name,
                id: people.credit_id,
                character: Boolean(people.character) && people.character,
                job: Boolean(people.job) && people.job,
            }
        )
    })
}