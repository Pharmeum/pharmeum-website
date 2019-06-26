import React from 'react';
import { Container, Row } from 'react-bootstrap';

import BlueBackground from '../layouts/blue-bg';
import WhiteCard from '../layouts/white-card';
import BlueCardCenter from '../layouts/blue-card-center';
import OnBoardLink from '../layouts/buttons/OnBoardLink';

import './sign-up__finish.css';

export default (props) => (
  <BlueBackground>
    <div className='sign-up__finish'>
      <Container>
        <Row>
          <BlueCardCenter>
            <WhiteCard>
              <img src='/images/LOGO@2x.png' className='blue-logo' alt='blue-logo' />
              <div className="message">Congratulations you have successfully completed registration. Check your email you should have received a confirmation email.</div>
              <OnBoardLink name='finish' onClick={() => props.history.push('/login')} />
            </WhiteCard>
          </BlueCardCenter>
        </Row>
      </Container>
    </div>
  </BlueBackground>
);
