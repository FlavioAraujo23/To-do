const pusher = require('../ws/pusher');

class Pusher {
  static async createWsChannelWithPusher(list){
    try{
      const channelName = `list-${list.id}-channel`;
      const payload = {
        content: list,
      };
      pusher.trigger(channelName, 'list-channel-create', payload);
      return channelName;
    } catch (error) {
      console.error('Erro ao criar channel', error);
      throw error;
    }
  }

  static async createEventInPusher(channel,task) {
    try{
      const payload = {
        content: task,
      };
      pusher.trigger(channel, 'TODO-CREATED', payload);
      return;
    } catch (error) {
      console.error('Erro ao criar event', error);
      throw error;
    }
  }

  static async deleteTodoEvent(todoId, channelName) {
    try{
      const payload = {
        deletedTaskId: todoId,
      };
      pusher.trigger(channelName, 'TODO-DELETED', payload);
      return;
    } catch (error) {
      console.error('Erro ao criar event', error);
      throw error;
    }
  }
  
  static async updateTodoEvent(data, channelName) {
    try{
      const payload = {
        content: data,
      };
      pusher.trigger(channelName, 'TODO-UPDATE', payload);
      return;
    } catch (error) {
      console.error('Erro ao criar event', error);
      throw error;
    }
  }
}

module.exports = Pusher;