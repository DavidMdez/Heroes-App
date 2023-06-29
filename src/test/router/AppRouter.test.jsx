import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { AppRouter } from "../../router/AppRouter";
import { AuthContext } from "../../auth";

describe('Pruebas en <AppRouter />', () => { 

  test('debe de mostrar el login si no esta autenticado', () => { 
    
    const contextValue = {
      logged: false,
    }

    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={ contextValue }>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // screen.debug();
    expect( screen.getAllByText('Login').length ).toBe(2);

  });

  test('debe de mostrar el componente de marvel si esta autenticado', () => { 
    
    const contextValue = {
      logged: true,
      user: {
        name: 'David',
        id: '123'
      }
    }

    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthContext.Provider value={ contextValue }>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // screen.debug();
    expect( screen.getByText('Marvel Comics') ).toBeTruthy();
  });

});