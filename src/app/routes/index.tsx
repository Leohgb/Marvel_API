//Todas as rotas da aplicação
import { BrowserRouter, Route, Routes as Switch, Navigate } from 'react-router-dom';

import { Dashboard } from '../pages';
import { App } from '../App';
import { Character } from '../pages/character/Character';
import { Hq } from '../pages/hq/Hq';

import './index.css'

export const Routes = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route element={<App />}>
          <Route path="/pagina-inicial" element={<Dashboard />} />
          <Route path="character/:id" element={<Character />} />
          <Route path="HQ/:id" element={<Hq/>}></Route>
          <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
