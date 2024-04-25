import ColoredLogger from 'utils/ColoredLogger';
// eslint-disable-next-line
type Callback<T = any> = (arg: T) => void;
export default class EventBus {
  eventsMap = new Map<string, Callback[]>();
  logger = new ColoredLogger('EVENTBUS', 'magenta');

  subscribe<T>(eventName: string, callback: Callback<T>) {
    const callbacks = (this.eventsMap.get(eventName) || []) as Callback[];

    callbacks.push(callback);
    this.eventsMap.set(eventName, callbacks);
    this.logger.log(` to event - ${eventName}`);

    return () => this.unsubscribe(eventName, callback);
  }

  unsubscribe(eventName: string, callback: Callback) {
    const callbacks = this.eventsMap.get(eventName) || [];

    this.logger.log(` from event - ${eventName}`);
    this.eventsMap.set(
      eventName,
      callbacks.filter(cb => cb !== callback)
    );
  }

  public publish<T>(eventName: string, data?: T) {
    Promise.resolve().then(() => {
      const callbacks = this.eventsMap.get(eventName) || [];

      this.logger.log(` event - ${eventName}`);
      callbacks.forEach(callback => {
        Promise.resolve().then(() => {
          callback(data);
        });
      });
    });
  }
}
