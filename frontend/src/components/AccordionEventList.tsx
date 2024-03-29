import React from 'react';
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, StackDivider, VStack, Text } from "@chakra-ui/react";
import EventBox from "../pages/EventBox";
import { EventEntity } from '../types/types';

interface AccordionEventListProps {
  title: string;
  events: EventEntity[] | undefined;
}

export default function AccordionEventList({ title, events }: AccordionEventListProps) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton fontSize="xl">
          {title}
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {events && events.length > 0 ? (
          <VStack
            spacing={4}
            divider={<StackDivider borderColor="gray.200" />}
            align="stretch"
          >
            {events?.map((e) => (
              <div key={e.bookingID}>
                <EventBox startTime={e.startTime} title={e.title} />
              </div>
            ))}
          </VStack>
        ) : (
          <Text px={5} fontSize="l">
            No events :(
          </Text>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
}
