import styles from './Button.module.css';

interface ButtonProps {
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
}


export function ButtonCss({color = 'primary'}: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[color]}`}>
      Enviar
    </button>
  )
}
// export function Button(props: ButtonProps) {
//   return (
//     <button className={styles.button}>
//       Enviar
//     </button>
//   )
// }