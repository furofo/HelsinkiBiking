import { useEffect, useState } from 'react';
import ItemCollection from './ItemCollection.js';
import MovieImageArr from "./MovieImages.js"
import RankingGrid from "./RankingGrid"


const RankItems = ({items, setItems, dataType, imgArr, localStorageKey }) => {
    // const [items, setItems] = useState([]);
    // const dataType = 1;
    const [reload, setReload] = useState(false);
    function Reload() {
        setReload(true);
    }
    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }
    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drop(ev) {

        ev.preventDefault();
        const targetElm = ev.target;
        console.log("this is target Elemetn bieng dropped", targetElm);
        if (targetElm.nodeName === "IMG") {
            return false;
        }
        if (targetElm.childNodes.length === 0) {
            console.log("daba before substring", ev.dataTransfer.getData("text"));
            var data = parseInt(ev.dataTransfer.getData("text").substring(5));
            const transformedCollection = items.map((item) => (item.id === parseInt(data)) ?
                { ...item, ranking: parseInt(targetElm.id.substring(5)) } : { ...item, ranking: item.ranking });
            setItems(transformedCollection);
        }

    }
    useEffect(() => {
        if (items == null) {
            getDataFromApi();
        }
    }, [dataType])

    function getDataFromApi() {
        fetch(`item/${dataType}`)
            .then((results) => {
                return results.json();
            })
            .then(data => {
                setItems(data);
            })

    }

    useEffect(() => {
        if (items != null) {
            localStorage.setItem(localStorageKey, JSON.stringify(items));
        }
        setReload(false);
    }, [items])

    useEffect(() => {
        if (reload === true) {
            getDataFromApi()
        }

    }, [reload])
    return (
        (items != null) ?
        <main>
            <RankingGrid items={items} imgArr={imgArr} drag={drag} allowDrop={allowDrop} drop={drop} />
                <ItemCollection items={items} drag={drag} imgArr={imgArr} />
                <button onClick={Reload} style={{"marginTop": "20px"} }>Reload</button>
            </main>
            : <main>Loading ....</main>
    )

}
export default RankItems;