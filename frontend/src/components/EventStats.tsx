import React, { ReactNode } from 'react';
import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { Calendar, Group } from 'grommet-icons';

interface EventStatsProps {
  eventCount: number;
  rsvpCount: number;
}

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}
function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py="5"
      border="1px solid"
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded="lg"
    >
      <Flex justifyContent="space-between">
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight="medium">{title}</StatLabel>
          <StatNumber fontSize="2xl" fontWeight="medium">
            {stat}
          </StatNumber>
        </Box>
        <Box
          my="auto"
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent="center"
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function EventsStats(props: EventStatsProps) {
  const { eventCount, rsvpCount } = props;

  return (
    <Box maxW="xl" py={3}>
      <chakra.h1 fontSize="2xl" py={2}>
        As a team, we&apos;ve delivered
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 10 }}>
        <StatsCard
          title="Events"
          stat={`${eventCount}`}
          icon={<Calendar size="large" color="black" />}
        />
        <StatsCard
          title="RSVPs"
          stat={`${rsvpCount}`}
          icon={<Group size="large" color="black" />}
        />
      </SimpleGrid>
    </Box>
  );
}
