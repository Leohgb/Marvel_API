//Todas as rotas da aplicação
import { BrowserRouter, Route, Routes as Switch, Navigate } from 'react-router-dom';
import { useState } from 'react';

import { Dashboard } from '../pages';
import { App } from '../App';

import './index.css'


export const Routes = () => {
  const [search, setSearch] = useState("" as string);

  return (
    <BrowserRouter>
      <Switch>
        <Route element={<App setSearch={setSearch} />}>
          <Route path="/pagina-inicial" element={<Dashboard search={search} />} />

          <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
