import './App.css'
import LeftPanel from "./layouts/LeftPanel/LeftPanel.jsx";
import Body from "./layouts/Body/Body.jsx";
import Header from "./components/Header/Header.jsx";
import JournalList from "./components/JournalList/JournalList.jsx";
import JournalForm from "./components/JournalForm/JournalForm.jsx";
import JournalItem from "./components/JournalItem/JournalItem.jsx";
import CardButton from "./components/CardButton/CardButton.jsx";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton.jsx";
import {useEffect, useState} from "react";


let isFirstRun = true;
let localDataCaheJSON;
function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const localDataJSON = localStorage.getItem('data') || '[]';
    localDataCaheJSON = localDataJSON;
    const localData = JSON.parse(localDataJSON);
    setData(localData.map(item => {
      return ({
        ...item,
        date: new Date(item.date),
      })
    }))

  }, [])

  useEffect(() => {

    if (data.length > 0 && !isFirstRun) {
      // console.log('saving')
      localStorage.setItem('data', JSON.stringify(data));
    } else if (data.length > 0) {
      isFirstRun = false;
    } else if (localDataCaheJSON === '[]') {
      isFirstRun = false;
    }
  }, [data])



  function addItem(item) {
    const ids = data.map(item => item.id);
    const maxId = Math.max(...ids, 1);

    for (let i = 1; i <= maxId + 1; i++) {
      if (!ids.includes(i)) {
        item.id = i;
        break;
      }
    }

    item.date = new Date(item.date);

    data.push(item);
    const newData = [...data];

    setData(() => newData);
  }


  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList data={data} />
      </LeftPanel>
      <Body>
        <JournalForm addItem={addItem} />
      </Body>
    </div>
  )
}

export default App
