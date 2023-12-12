import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewBookIssueForm } from './components/NewBookIssueForm';
import { NewUserForm } from './components/NewUserForm';
import { BookList } from './components/BookList';
import { AddnewbookForm } from './components/AddnewbookForm';
import { LendedBooks } from './components/LendedBooks';
import { Addbook } from './components/Addbook';
import { Members } from './components/Members';
import { Navigate } from 'react-router-dom';

function App() {

  return (
<>
<Header/>
<Routes>
<Route path='/' element={<Navigate replace to="/dashboard"/>}  />
<Route path='/dashboard' element={<Dashboard />}/>
<Route path='/newuser' element={<NewUserForm/>}/>
<Route path='/issuebook' element={<NewBookIssueForm/>}/>
 <Route path='/booklist' element={<BookList/>}/>
 <Route path='/newbookform' element={<AddnewbookForm/>}/>
 <Route path='/members' element={<Members/>}/>
 <Route path='/book/:id' element={<Addbook/>}/>
 <Route path='/loaned/books' element={<LendedBooks  />}/>
</Routes>
</>
  );
}

export default App;