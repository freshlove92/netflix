import { ClipLoader } from 'react-spinners';

export default function Loading({ ...props }) {
  return (
    <div className='text-center p-10'>
      <ClipLoader color='blue' speedMultiplier={0.5} {...props} />
    </div>
  );
}