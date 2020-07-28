class dayParting {
  constructor(params) {
    const defaultState = {
      payload: {
        campaign_ids: [1234],
        // 2D array for each day
        schedule: [
          [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ], // Sunday
          [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ], // Monday
          [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ], // Tuesday
          [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ], // Wednesday
          [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ], // Thursday
          [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ], // Friday
          [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ], // Saturday
        ],
      },
    };

    this.dayPartingState = { ...defaultState, ...params };
    this.render();
    this.addHandlers();
  }

  generateTableHead(table, hourTitle) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    row.appendChild(document.createElement('th'));
    for (let hour of hourTitle) {
      let th = document.createElement('th');
      let title = document.createTextNode(hour);
      th.appendChild(title); // Creates the th
      row.appendChild(th); // Adds th to the row
    }
  }

  generateTable(table, days, hours) {
    for (let i = 0; i < days.length; i++) {
      let row = table.insertRow();
      let dayTitle = row.insertCell();
      let text = document.createTextNode(this.addDay(days[i]));
      dayTitle.appendChild(text);
      for (let j = 0; j < hours.length; j++) {
        let cell = row.insertCell();
        cell.classList.add('hour-block');
        if (this.dayPartingState.payload.schedule[i][j]) {
          cell.classList.add('enabled');
        }
      }
    }
  }

  getCellIndex(rowsArray) {
    const rowIndex = rowsArray.findIndex((row) => row.contains(event.target));
    const columns = Array.from(
      rowsArray[rowIndex].querySelectorAll('td.hour-block')
    );
    const columnIndex = columns.findIndex((column) => column == event.target);
    return [rowIndex - 1, columnIndex];
  }

  addDay(dayNumber) {
    const day = {
      0: 'sunday',
      1: 'monday',
      2: 'tuesday',
      3: 'wendesday',
      4: 'thursday',
      5: 'friday',
      6: 'saturday',
      blank: ' ',
    };

    return day[dayNumber] || 'day does not exist';
  }

  toggleBlockofHours(start, end) {
    const table = document.getElementById('dayParting');

    if (start[0] > end[0]) {
      [start[0], end[0]] = [end[0], start[0]];
    }

    if (start[1] > end[1]) {
      [start[1], end[1]] = [end[1], start[1]];
    }

    let height = start[0] + (end[0] - start[0]);
    let width = start[1] + (end[1] - start[1]);

    for (let i = start[0]; i <= height; i++) {
      for (let j = start[1]; j <= width; j++) {
        this.dayPartingState.payload.schedule[i][j] = !this.dayPartingState
          .payload.schedule[i][j];
        table.rows[i + 1].cells[j + 1].classList.toggle('enabled');
        table.rows[i + 1].cells[j + 1].classList.remove('preview');
      }
    }
  }

  togglePreviewBlockofHours(start, end) {
    const table = document.getElementById('dayParting');

    if (start[0] > end[0]) {
      [start[0], end[0]] = [end[0], start[0]];
    }

    if (start[1] > end[1]) {
      [start[1], end[1]] = [end[1], start[1]];
    }

    let height = start[0] + (end[0] - start[0]);
    let width = start[1] + (end[1] - start[1]);

    for (let i = start[0]; i <= height; i++) {
      for (let j = start[1]; j <= width; j++) {
        table.rows[i + 1].cells[j + 1].classList.add('preview');
      }
    }
  }

  addHandlers() {
    let isMouseDown = false;
    let start, end;

    // Get each row
    const rows = document.querySelectorAll('#dayParting tr');

    // Create an array of each row instance
    const rowsArray = Array.from(rows);

    // Get each hour block and for each hour, add click event listener
    document.querySelectorAll('td.hour-block').forEach((hour) => {
      hour.addEventListener('mousedown', (event) => {
        isMouseDown = true;
        event.target.classList.toggle('preview');
        let cellIndex = this.getCellIndex(rowsArray);
        start = cellIndex;
        let [day, hour] = cellIndex;
        // this.dayPartingState.payload.schedule[day][hour] = !this.dayPartingState
        //   .payload.schedule[day][hour];
      });
      hour.addEventListener('mouseover', (event) => {
        if (isMouseDown) {
          let cellIndex = this.getCellIndex(rowsArray);
          end = cellIndex;
          this.previewClearTable();
          this.togglePreviewBlockofHours(start, end);
          // event.target.classList.toggle('preview');
          // let cellIndex = this.getCellIndex(rowsArray);
          // let [day, hour] = cellIndex;
          // this.dayPartingState.payload.schedule[day][hour] = !this
          //   .dayPartingState.payload.schedule[day][hour];
        }
      });
      hour.addEventListener('mouseup', (event) => {
        let cellIndex = this.getCellIndex(rowsArray);
        end = cellIndex;
        this.toggleBlockofHours(start, end);
      });
    });
    document.addEventListener('mouseup', (e) => {
      isMouseDown = false;
      this.previewClearTable();
      this.showSchedule();
    });
  }

  clearTable() {
    const table = document.getElementById('dayParting');
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 24; j++) {
        this.dayPartingState.payload.schedule[i][j] = false;
        table.rows[i + 1].cells[j + 1].classList.remove('enabled');
        table.rows[i + 1].cells[j + 1].classList.remove('preview');
      }
    }
  }

  previewClearTable() {
    const table = document.getElementById('dayParting');
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 24; j++) {
        table.rows[i + 1].cells[j + 1].classList.remove('preview');
      }
    }
  }

  render() {
    const table = document.getElementById('dayParting');

    const hourTitle = Object.keys(this.dayPartingState.payload.schedule[0]);
    const dayTitle = Object.keys(this.dayPartingState.payload.schedule);
    this.generateTable(table, dayTitle, hourTitle);
    this.generateTableHead(table, hourTitle);
  }

  // HELPERS
  showObject() {
    console.log(this.dayPartingState.payload);
  }

  showSchedule() {
    console.log(this.dayPartingState.payload.schedule);
  }

  changeFirstElement() {
    this.dayPartingState.payload.schedule[0][0] = false;
  }
}
