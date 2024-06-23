//Todas as rotas da aplicação
import { BrowserRouter, Route, Routes as Switch, Navigate } from 'react-router-dom';
import './index.css'

import { App } from '../App';
import { Character } from '../pages/character/Character';
import { Hq } from '../pages/hq/Hq';
import { Dashboard } from '../pages/home/Home';

export const Routes = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route element={<App />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path="character/:id" element={<Character />} />
          <Route path="HQ/:id" element={<Hq />}></Route>
          <Route path="*" element={<Navigate to="/home" />} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
