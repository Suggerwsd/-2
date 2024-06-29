// 等待页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentForm');
    const confirmation = document.getElementById('confirmation'); // 获取显示确认信息的元素

    // 监听预约表单提交事件
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // 阻止表单默认提交行为

        // 获取表单中的输入值
        const name = form.elements['name'].value.trim();
        const phone = form.elements['phone'].value.trim();
        const appointmentDate = form.elements['appointmentDate'].value;
        const time = form.elements['time'].value;

        // 基本的输入验证，姓名、电话和预约日期不能为空
        if (name === '' || phone === '' || appointmentDate === '') {
            alert('请填写姓名、电话和选择预约日期！');
            return;
        }

        // 构建确认信息
        let confirmationText = `感谢您的预约，${name}！`;

        // 格式化预约日期为 yyyy-mm-dd
        const formattedDate = new Date(appointmentDate).toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).replace(/\//g, '-');

        // 添加预约日期和时间到确认信息中
        confirmationText += `您已成功预约于 ${formattedDate} ${time} 的服务时间。`;
        confirmationText += `我们会尽快与您联系确认。`;

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
// 在文档加载完成后运行脚本
document.addEventListener('DOMContentLoaded', function() {
    // 获取表单元素
    const form = document.getElementById('appointmentForm');
    
    // 添加提交事件监听器
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // 阻止表单默认提交行为
        
        // 获取选中的服务项目
        const selectedServices = Array.from(form.querySelectorAll('input[name="service"]:checked'))
                                   .map(input => input.value);
        
        // 获取备注信息
        const additionalNotes = form.querySelector('#additionalNotes').value;
        
        // 在这里可以将选中的服务项目和备注信息发送到服务器或进行其他处理
        console.log('选中的服务项目:', selectedServices);
        console.log('备注信息:', additionalNotes);
        
        // 在这里可以添加进一步的逻辑，例如显示成功消息或重置表单
        // 例如：
        // form.reset(); // 重置表单
        // alert('预约提交成功！'); // 弹出成功消息
    });
});
