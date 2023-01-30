

export default function filmDurationAdapter(duration) {
    const hours = String(duration / 60).split(".")[0] + "h"
    const minutes = String(duration % 60) + "min" 
    return hours + " " + minutes
}