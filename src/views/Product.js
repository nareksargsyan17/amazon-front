import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProductRequest} from "../redux/products/actions";
import {useEffect} from "react";
import {usePrevious} from "../usePrevious/usePrevious";
import {Button, Layout, Result, Skeleton} from "antd";


export default function Product() {
  let { productId } = useParams();
  const dispatch = useDispatch();
  const {
    isGetProductFailure,
    isGetProductRequest,
  } = useSelector(state => state.products);

  const prevIsGetProductFailure = usePrevious(isGetProductFailure);
  

  useEffect(() => {
    dispatch(getProductRequest({productId}));
  }, [dispatch, productId]);

  useEffect(() => {
   if(isGetProductFailure && prevIsGetProductFailure === false) {
     // console.log('======')
   }
  }, [isGetProductFailure, prevIsGetProductFailure])

  return (
    <Layout style={{minHeight: "100%"}}>
      <Skeleton active loading={isGetProductRequest}>
        {
          !isGetProductFailure ? (
            <div>{productId}</div>
          ) : (
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={<Button type="primary">Back Home</Button>}
            />)
        }
      </Skeleton>
    </Layout>

  )
}