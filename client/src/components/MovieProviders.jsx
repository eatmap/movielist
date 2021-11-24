import {
  Box,
  Text,
  Spinner,
  Image,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { BsXCircle } from 'react-icons/bs';
import { GetMovieProviders } from '../actions/movie';

const PROVIDER_BASE_URL = 'https://image.tmdb.org/t/p/w45';

function ProvidersDisplay({ providerType, providerList }) {
  return (
    <Box>
      <Text>{providerType}</Text>
      <Wrap>
        {providerList.map((x) => {
          const { provider_id, logo_path, provider_name } = x;
          const imgUrl = `${PROVIDER_BASE_URL}${logo_path}`;
          return (
            <WrapItem key={provider_id}>
              <Image src={imgUrl} title={provider_name} alt={provider_name} />
            </WrapItem>
          );
        })}
      </Wrap>
    </Box>
  );
}

export default function MovieProviders({ id }) {
  const { providers, isLoading, error } = GetMovieProviders(id);

  if (error) {
    return (
      <Box d="flex" flexDir="column" alignItems="center" fontSize="md" p="2">
        <Text fontSize="2xl" my="2">
          <BsXCircle />
        </Text>
        <Text>{error?.message || 'Failed to get providers'}</Text>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box
        d="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="3xl"
        p="5"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  const streamingServices = providers.flatrate;
  const rentServices = providers.rent;
  const buyServices = providers.buy;

  return (
    <Box my="1">
      {streamingServices && (
        <ProvidersDisplay
          providerType="Stream"
          providerList={streamingServices}
        />
      )}
      {rentServices && (
        <ProvidersDisplay providerType="Rent" providerList={rentServices} />
      )}
      {buyServices && (
        <ProvidersDisplay providerType="Buy" providerList={buyServices} />
      )}
    </Box>
  );
}
