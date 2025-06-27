import React from 'react'
import Card from '../components/card/Card'
import img from '../img/testimg.jpg'

const JoinMembership = () => {
  return (
    <>
    <div>JoinMembership</div>
        <Card
      imageUrl={img}
      title="제목"
      details={[
        '성인 남녀',
        '2025.07.01 ~ 2025.07.15',
        '2025.08.01 ~ 2025.08.31',
        '30,000원'
      ]}
    />
    </>
  )
}

export default JoinMembership