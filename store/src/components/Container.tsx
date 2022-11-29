import styles from '../styles/components/container.module.css'

const Container = ({ children }: any) => {
  return <div className={styles.container}>{children}</div>
}

export default Container
