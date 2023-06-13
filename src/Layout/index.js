import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import ListOfDecks from "./ListOfDecks";
import {Route, Switch} from "react-router-dom";
import Study from "./Study";
import CreateDeck from './CreateDeck';
import ViewDeck from './ViewDeck'
import EditDeck from './EditDeck'
import AddCard from './AddCard';
import EditCard from './EditCard';

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
        <Route path="/" exact>
        <ListOfDecks />
        </Route>
        <Route path="/decks/new" exact>
          <CreateDeck />
        </Route>
        <Route path="/decks/:deckId" exact>
          <ViewDeck />
        </Route>
        <Route path="/decks/:deckId/study" exact>
          <Study />
        </Route>
        <Route path="/decks/:deckId/edit" exact>
          <EditDeck />
        </Route>
        <Route path="/decks/:deckId/cards/new" exact>
          <AddCard />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit" exact>
          <EditCard />
        </Route>
        <Route>
        <NotFound />
        </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
