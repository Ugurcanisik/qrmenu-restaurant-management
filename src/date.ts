export class date {
  static tarih = {
    day: new Date().toLocaleString('tr-TR', { day: '2-digit' }),
    month: new Date().toLocaleString('tr-TR', { month: '2-digit' }),
    year: new Date().toLocaleString('tr-TR', { year: 'numeric' }),
    time: new Date().toLocaleTimeString('tr-TR'),
  };

  static reloadDate() {
    this.tarih = {
      day: new Date().toLocaleString('tr-TR', { day: '2-digit' }),
      month: new Date().toLocaleString('tr-TR', { month: '2-digit' }),
      year: new Date().toLocaleString('tr-TR', { year: 'numeric' }),
      time: new Date().toLocaleTimeString('tr-TR'),
    };
  }

  static fullDateTime() {
    const now = this.fullDateTr() + ' ' + this.tarih.time;
    this.reloadDate();
    return now;
  }

  // static findMonth(value){
  //     const month = ['01','02','03','04','05','06','07','08','09','10','11','12']
  //     return month[value]

  // }

  // static findDays(value){
  //     const days = ['','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'
  //     ,'24','25','26','27','28','29','30','31']
  //     return days[value]
  // }

  static fullDate() {
    // return {day: this.tarih.day, month: this.tarih.month , year: this.tarih.year, time: this.tarih.time, eski: new Date()}
    return this.tarih.year + '.' + this.tarih.month + '.' + this.tarih.day;
  }

  static fullDateTr() {
    return this.tarih.year + '-' + this.tarih.month + '-' + this.tarih.day;
  }

  static getMonth() {
    return this.tarih.month;
  }

  static getDay() {
    return this.tarih.day;
  }

  static getYearandMonth() {
    return this.tarih.year + '-' + this.tarih.month;
  }

  static yesterday() {
    const yesterday = parseInt(this.tarih.day) - 1;
    if (yesterday > 9) {
      return this.getYearandMonth() + '-' + yesterday;
    } else if (yesterday < 10) {
      return this.getYearandMonth() + '-0' + yesterday;
    }
  }

  static getYear() {
    return this.tarih.year;
  }

  static monthName(value) {
    const month = {
      '01': 'ocak',
      '02': 'subat',
      '03': 'mart',
      '04': 'nisan',
      '05': 'mayıs',
      '06': 'haziran',
      '07': 'temmuz',
      '08': 'ağustos',
      '09': 'eylül',
      '10': 'ekim',
      '11': 'kasım',
      '12': 'aralık',
    };
    return '"' + month[value] + '",'.toString();
  }
}
