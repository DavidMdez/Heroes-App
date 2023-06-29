import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../heroes/pages/SearchPage";

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}));

describe('Pruebas en <SearchPage />', () => { 

  beforeEach( () => jest.clearAllMocks() );

  // test('debe de mostrarse correctamente con valores por defecto', () => { 

  //   const { container } = render(
  //     <MemoryRouter>
  //       <SearchPage />
  //     </MemoryRouter>
  //   )

  //   expect( container ).toMatchSnapshot();
  // });

  test('debe de mostrar a Batman y el input el valor del queryString', () => { 

    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    )

    // screen.debug();

    const input = screen.getByRole('textbox');
    expect( input.value ).toBe('batman');

    const img = screen.getByRole('img');
    expect( img.src ).toContain('/heroes/dc-batman.jpg')

    const alert = screen.getByLabelText('alert-hero');
    expect( alert.style.display ).toBe('none')
  });

  test('debe de mostrar un error si no se encuentra el hero', () => { 

    render(
      <MemoryRouter initialEntries={['/search?q=batmanassad']}>
        <SearchPage />
      </MemoryRouter>
    )

    const alert = screen.getByLabelText('alert-hero');
    expect( alert.style.display ).toBe('')
  });

  test('debe de llamar navigate a la pantalla nueva', () => { 

    const inputValue = 'batman';

    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    )

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { name: 'searchText', value: inputValue } })

    const form = screen.getByLabelText('form');
    fireEvent.submit( form );

    // screen.debug();
    expect( mockUseNavigate ).toHaveBeenLastCalledWith( `?q=${ inputValue }` );
  });

});