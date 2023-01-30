import { motion } from "framer-motion"


export default function () {
    return (
        <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ duration: .3}}
            className="loader">
            <span className="loader__shape"></span>
        </motion.div>
    )
}