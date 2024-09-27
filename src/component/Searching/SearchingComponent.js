
import styles from './searching.module.css'; 

export function SearchingContainer(props){

    //Handle the Value of textbox 
    function handleSearchValue(event){
        props.setInputValue(event.target.value);
    }

    function resetSearchValue(){
        props.setInputValue('');
    }

    

    return (
        <div className={styles.serchingContainer} >
            <div className={styles.searchingTitle}> Searching </div>
            <form>
                <input type="text" className={styles.searchingTextBox} value={props.inputValue} onChange={handleSearchValue} onClick={resetSearchValue}></input>
                <br />
                <input type='submit' valaue="Search" className={styles.searchingbutton} onClick={props.handleSearchingBtn}></input>
            </form>
        </div>

    )
}

