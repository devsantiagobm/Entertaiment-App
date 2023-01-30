export default function propsAdapter(data) {
   const props = {}

   for (const element of data) {
      const [key, value] = Object.entries(element)[0]
      props[key] = value
   }

   return props 
}