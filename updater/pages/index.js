import Head from 'next/head'
import {
  Form,
  Row,
  Col,
  Button,
} from 'react-bootstrap'
import styles from '../styles/index.module.css'

const AddressForm = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Updater</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.description}>
          What address are you moving FROM?
        </h2>

        <div className={styles.form}>
          <Form>
            <Form.Group className="mb-4" controlId="street">
              <Form.Control className="p-3" type="text" placeholder="STREET ADDRESS" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="apt">
              <Form.Control className="p-3" type="text" placeholder="APARTMENT" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="city">
              <Form.Control className="p-3" type="text" placeholder="CITY" />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-4" controlId="state">
                  <Form.Control className="p-3" type="text" placeholder="STATE" />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-4" controlId="zip">
                  <Form.Control className="p-3" type="text" placeholder="ZIP" />
                </Form.Group>
              </Col>
            </Row>

            <Button className="p-3" variant="primary" type="button">
              Next
            </Button>
          </Form>
        </div>
      </main>
    </div>
  )
}

export default AddressForm;