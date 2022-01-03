import classnames from "classnames"
import styles from "../styles/Slider.module.css"

interface SliderProps {
id:string
label?:string
onChange: (e:React.ChangeEvent<HTMLInputElement>) => void
min?:number
max?:number
value:number
className?:string
}

const Slider:React.FC<SliderProps> = ({id,onChange,min,max, className,value, label = ""}) => {

    const classname = classnames(styles.container, 
        className
    )

    return <div className={classname}>
        <label htmlFor={id}>{label} {value}</label>
        <input onChange={(e) => onChange(e)} type="range" min={min} max={max} value={value}/>
    </div>
}

export default Slider