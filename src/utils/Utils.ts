export const capitalize = (value:string) => {
  return `${(value[0] || " ").toUpperCase()}${value.slice(1)}`
}

export const lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus expedita magnam ipsam officia dolores nam sunt velit ab aliquam eos laudantium reiciendis assumenda veritatis repudiandae, facere vel? Beatae, architecto eum!"

export const getWhatsAppLink = (phone:string, message:string) => encodeURI(`https://wa.me/55${phone}?text=${message}`);

export const getEnumNames = <T extends Record<string, string | number>>(enumObject: T):string[] => {
  return Object.keys(enumObject).filter(key => isNaN(Number(enumObject[key]))) as (keyof T)[];
}
import mainLogo from "./../images/logo_color.png"
export const logo = mainLogo;