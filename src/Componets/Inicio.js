import Carousel from 'react-bootstrap/Carousel';
import Navbar from './navbar'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function DarkVariantExample() {
    return (
        <>
            <Navbar />
            <div className='container'>
                <h1 className='my-3'>Ensalamento</h1>
                <Carousel className="my-5">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="feisBanner.png"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="mecUnisales.png"
                            alt="2 slide"
                        />
                    </Carousel.Item>
                </Carousel>


            </div>
            <Card className="text-center">
                <Card.Header>Projeto Frontend - Ensalamento</Card.Header>
                <Card.Body>
                    <Card.Title>Ensalamento</Card.Title>
                    <Card.Text>
                        O projeto tem como objetivo cadastrar desafios no mês de novembro.
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">Desenvolvido por Gustavo Endringer</Card.Footer>
            </Card>
        </>
    );
}

export default DarkVariantExample;