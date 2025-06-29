
import styles from './searching.module.css'; 

export function SearchingContainer(props){

    //Variable to control the component
    const [inputValue, handleSearchValue, handleSearchingBtn, resetSearchValue] = props.searchingControl; 

   

    return (
        <div className={styles.serchingContainer} >
            <div className={styles.searchingTitle}> Searching </div>
            <form>
                <input type="text" className={styles.searchingTextBox} value={inputValue} onChange={handleSearchValue} onClick={resetSearchValue}></input>
                <br />
                <input type='submit' valaue="Search" className={styles.searchingbutton} onClick={handleSearchingBtn}></input>
            </form>
        </div>

    )
}

