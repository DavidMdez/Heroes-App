import { fireEvent, render, screen } from "@testing-library/react";
import { AuthContext } from "../../../auth/context";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "../../../ui";

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}));

describe('Pruebas en <navabr />', () => { 

  const contextValue = {
    logged: true,
    user: {
      name: 'David'
    },
    logout: jest.fn()
  }

  beforeEach( () => jest.clearAllMocks() );

  test('debe de mostrar el nombre del usuario', () => { 

    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    // screen.debug();
    expect( screen.getByText('David') ).toBeTruthy();

  });

  test('debe de llamar el logout y navigate cuando se hace click en el boton', () => { 

    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    const logoutBtn = screen.getByRole('button');
    fireEvent.click( logoutBtn );

    expect( contextValue.logout ).toHaveBeenCalled();
    expect( mockUseNavigate ).toHaveBeenCalledWith("/login", {"replace": true});
  });

});