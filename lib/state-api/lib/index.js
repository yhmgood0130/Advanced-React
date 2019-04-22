class StateApi {
  constructor(rawData) {
    this.data = {
      articles: this.mapIntoObject(rawData.articles),
      authors: this.mapIntoObject(rawData.authors),
      searchTerm: '',
      timestamp: new Date()
    };
    this.subscriptions = {};
    this.lastSubscriptionId = 0;
    
    setTimeout(() => {
      const fakeArticle = {
        ...rawData.articles[0],
        id: 'fakeAccountId',
      };
  
      this.data = {
        ...this.data,
        articles: {
          ...this.data.articles,
          [fakeArticle.id]: fakeArticle
        },
      };
      this.notifySubscriber();
    }, 1000);
  }
  mapIntoObject(arr) {
    return arr.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
  }

  // Test Immutable Data Structure
  lookupAuthor = (authorId) => {
    return this.data.authors[authorId];
  }
  getState = () => {
    return this.data;
  }
  mergeWithState = (stateChange) => {
    this.data = {
      ...this.data,
      ...stateChange,
    };
    this.notifySubscriber();
  }
  setSearchTerm = (searchTerm) => {
    this.mergeWithState({
      searchTerm,
    });
    // this.data.searchTerm = searchTerm;
    // this.notifySubscriber();
  }
  subscribe = (res) => {
    this.lastSubscriptionId++;
    this.subscriptions[this.lastSubscriptionId] = res;
    return this.lastSubscriptionId;
  }
  notifySubscriber = () => {
    Object.values(this.subscriptions).forEach((cb) => cb());
  }
  unsubscribe = (subscriptionId) => {
    delete this.subscriptions[subscriptionId];
  }

  startClock = () => {
    setInterval(() => {
      this.mergeWithState({
        timestamp: new Date()
      });
    }, 1000);
  }
}

export default StateApi;