// 等待页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentForm'); // 获取预约表单元素
    const confirmation = document.getElementById('confirmation'); // 获取显示确认信息的元素
  
    // 监听预约表单提交事件
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // 阻止表单默认提交行为
  
      // 获取表单中的输入值
      const name = form.elements['name'].value.trim();
      const phone = form.elements['phone'].value.trim();
      const time = form.elements['time'].value;
  
      // 做一些基本的输入验证，比如姓名和电话不能为空
      if (name === '' || phone === '') {
        alert('请填写姓名和电话号码！');
        return;
      }
  
      // 构建确认信息
      const confirmationText = `感谢您的预约，${name}！您已成功预约时间：${time}。我们会尽快与您联系确认。`;
  
      // 显示确认信息
      confirmation.textContent = confirmationText;
  
      // 可以在这里添加进一步的处理逻辑，比如发送预约信息到服务器等
    });
  });
// 示例：根据用户的语言选择显示不同内容
const languageSpan = document.getElementById('languages');
const userLanguage = navigator.language || navigator.userLanguage;

if (userLanguage.startsWith('ja')) {
    languageSpan.textContent = '日本語';
} else {
    languageSpan.textContent = 'English';
}
  // script.js
document.addEventListener('DOMContentLoaded', function() {
    const appointmentTimes = document.querySelectorAll('.appointment-time');
  
    appointmentTimes.forEach(function(timeSlot) {
      const bookButton = timeSlot.querySelector('.book-btn');
  
      // 模拟已预约状态的处理
      if (isTimeSlotBooked(timeSlot)) {
        timeSlot.classList.add('booked');
        bookButton.disabled = true;
        bookButton.textContent = '已预约';
      }
  
      // 预约按钮点击事件处理
      bookButton.addEventListener('click', function() {
        // 在实际应用中，这里应该是向服务器发送预约请求的逻辑
  
        // 模拟预约成功后的处理
        timeSlot.classList.add('booked');
        bookButton.disabled = true;
        bookButton.textContent = '已预约';
      });
    });
  
    // 模拟判断时间段是否已预约的函数
    function isTimeSlotBooked(timeSlot) {
      // 这里可以根据具体的逻辑判断时间段是否已被预约，例如检查服务器返回的数据
      // 此处为示例，简单地通过classList判断
      return timeSlot.classList.contains('booked');
    }
  });
  // 获取表单元素
const contactForm = document.getElementById('contactForm');

// 监听表单提交事件
contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单默认提交行为

    // 收集表单数据
    const formData = new FormData(contactForm);

    // 发送数据到后端处理
    fetch('/submit_message', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('网络错误，请稍后再试。');
        }
        return response.json();
    })
    .then(data => {
        alert('留言提交成功！我们会尽快与您联系。');
        contactForm.reset(); // 提交成功后重置表单
    })
    .catch(error => {
        alert('提交留言时出错：' + error.message);
    });
});
// 获取表单元素
const appointmentForm = document.getElementById('appointmentForm');

// 监听表单提交事件
appointmentForm.addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单默认提交行为

    // 收集表单数据
    const formData = new FormData(appointmentForm);

    // 将选择的服务拼接成字符串
    let selectedServices = [];
    formData.getAll('service').forEach(service => {
        selectedServices.push(service);
    });
    formData.delete('service'); // 删除复选框字段，避免重复提交

    // 获取备注信息
    const additionalNotes = formData.get('additionalNotes');

    // 将选择的服务和备注信息合并为一个对象或发送到后端处理
    const appointmentData = {
        services: selectedServices,
        additionalNotes: additionalNotes
        // 其他表单数据
    };

    // 这里可以发送数据到后端处理，例如使用fetch API发送POST请求
    fetch('/submit_appointment', {
        method: 'POST',
        body: JSON.stringify(appointmentData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('网络错误，请稍后再试。');
        }
        return response.json();
    })
    .then(data => {
        alert('预约提交成功！我们会尽快与您联系。');
        appointmentForm.reset(); // 提交成功后重置表单
    })
    .catch(error => {
        alert('提交预约时出错：' + error.message);
    });
});
