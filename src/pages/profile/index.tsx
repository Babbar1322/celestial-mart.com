import { memo } from 'react';

import Container from '@/components/Container';
import Typography from '@/components/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@/redux/slices/userSlice';
import Button from '@/components/Button';
import { setIsLoggedIn } from '@/redux/slices/authSlice';
import Orders from './Orders';

const ProfilePage = memo(() => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <Container>
        <div className="row">
            <div className="col-md-6 border-end">
                <Typography fontSize={2} fontWeight='semibold' marginBottom="4">User Information</Typography>
                <div className="row align-items-center">
                    <div className="col-sm-3">
                        <img src="/assets/images/default-user.jpeg" alt="" className='image-square rounded-4' />
                    </div>
                    <div className="col">
                        <Typography fontSize={3} fontWeight='semibold'>{user?.name}</Typography>
                        <Typography fontSize={6}>{user?.email}</Typography>
                    </div>
                </div>

                <Button onClick={() => dispatch(setIsLoggedIn({isLoggedIn: false, token: ''}))} marginTop="5">Logout</Button>
            </div>
            <div className="col">
                <Typography fontSize={2} fontWeight='semibold' marginBottom="4">Additional Information</Typography>
                <Orders />
            </div>
        </div>
    </Container>
  )
})

export default ProfilePage;