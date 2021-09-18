import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
    let event, EventWrapper;
  beforeAll(() => {
    event = mockData[1];
    EventWrapper = shallow(<Event event={event} />);
  });
  test('render event container', () => {
    expect(EventWrapper.find('.event-container')).toHaveLength(1);
  });
  test('render event title', () => {
    expect(EventWrapper.find('.event-title')).toHaveLength(1);
  });
  test('render event location', () => {
    expect(EventWrapper.find('.event-location')).toHaveLength(1);
  });
  test('render event time', () => {
    expect(EventWrapper.find('.event-time')).toHaveLength(1);
  });
  test('populate event time correctly', () => {
    const eventDate = new Date(event.start.dateTime);
    expect(EventWrapper.find('.event-time').text()).toBe(eventDate.toString());
  });
  test('render show more button by default', () => {
    expect(EventWrapper.state('showDetails')).toBe(false);
    expect(EventWrapper.find('.details-btn').text()).toBe('show more');
  });
  test('render event details on show more button click', () => {
    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.find('.details-btn').text()).toBe('show less');
    expect(EventWrapper.find('.event-description')).toHaveLength(1);
  });
  test('hide event details on show less button click', () => {
    EventWrapper.setState({showDetails: true});
    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.find('.details-btn').text()).toBe('show more');
    expect(EventWrapper.find('.event-description').text()).toBe('');
  });
});
