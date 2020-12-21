export const cardQueryModel = {
  id: {
    method: "set",
    param: "Id"
  },
  partnerId: {
    method: "set",
    param: "PartnerId"
  },
  gameId: {
    method: "set",
    param: "GameId"
  },
  betTypeId: {
    method: "set",
    param: "BetTypeId"
  },
  winningFrom: {
    method: "set",
    param: "WinningFrom"
  },
  winningTo: {
    method: "set",
    param: "WinningTo"
  },
  stakeFrom: {
    method: "set",
    param: "StakeFrom"
  },
  date: {
    method:"set",
    param: "Date"
  },
  startDate: {
    method: "set",
    param: "StartDate",
    default: new Date().toLocaleDateString()
  },
  endDate: {
    method: "set",
    param: "EndDate",
    default: new Date().toLocaleDateString()
  },
  startTime: {
    method: "set",
    param: "StartTime",
    default: new Date().toLocaleTimeString()
  },
  endTime: {
    method: "set",
    param: "EndTime",
    default: new Date().toLocaleTimeString()
  },
  number: {
    method: "set",
    param: "Number"
  },
  statuses: {
    method: "set",
    param: "Statuses"
  },
  take: {
    method: "set",
    param: "Take"
  },
  skip: {
    method: "set",
    param: "Skip"
  },
  orderColumnName: {
    method: "set",
    param: "OrderColumnName"
  },
  orderByAsc: {
    method: "set",
    param: "OrderByAsc"
  },
  offset: {
    method: "set",
    param: "offset"
  },
  pageNum: {
    method: "set",
    param: "pageNumber"
  },
  pageSize: {
    method: "set",
    param: "pageSize"
  }
};

export const topWinningModel = {
  id: {
    method: "set",
    param: "Id"
  },
  take: {
    method: "set",
    param: "Take"
  },
  skip: {
    method: "set",
    param: "Skip"
  }
};
