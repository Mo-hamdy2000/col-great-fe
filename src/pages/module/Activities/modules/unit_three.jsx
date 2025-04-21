import { useEffect, useContext } from 'react';
import { AuthContext } from "../../../../Components/Auth/AuthcontextProvider";

const UnitThree = () => {
  const ctx = useContext(AuthContext);

  useEffect(() => {
    const loadChatScript = (scriptContent, scriptId) => {
      if (document.getElementById(scriptId)) {
        return;
      }

      const script = document.createElement('script');
      script.innerHTML = scriptContent;
      document.head.appendChild(script);
    };

    // Define both script contents
    const firstChatScript = `
      (function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="hUTQukwZLt7XXLT_ObsUf";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();
    `;

    const secondChatScript = `
      (function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="L4gFvH-jLBs_Sklqtv7WB";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();
    `;

    // Use ctx.isEven to determine which chat to use
    const useSecondChat = ctx.isAdmin;
    // const useSecondChat = true;

    // Load appropriate script based on condition
    if (useSecondChat) {
      loadChatScript(secondChatScript, '-KZqQ9i53JSg5G_2eO0JA');
    } else {
      loadChatScript(firstChatScript, 'qR1uqL3AFEbH5ij20P2-l');
    }

    // Cleanup function
    return () => {
      const firstScript = document.getElementById('qR1uqL3AFEbH5ij20P2-l');
      const secondScript = document.getElementById('-KZqQ9i53JSg5G_2eO0JA');
      if (firstScript) firstScript.remove();
      if (secondScript) secondScript.remove();
    };
  }, []); // Empty dependency array means this runs once when component mounts

  return (
    <div>
    <div>
      <u className="text-red text-bold text-large text-center">مهام الموديول الثالث</u>
      <div className="text-bold text-center">عزيزي الطالب / عزيزتي الطالبة انجز المهام الآتية:</div>
      <div>
        باستخدام المساعد الافتراضي الموجود ببيئة التعلم الإلكترونية قم بإنشاء ملف ورد يتضمن: عنوان للواقع المعزز، و أهداف للواقع المعزز في ضوء هذا العنوان، و محتوى مقترح له في ضوء العنوان الذي تم صياغته، ويحقق الأهداف التي تمت صياغتها، ثم اقترح عدد من الوسائط المتعددة التي تتناسب مع العناصر السابقة للواقع المعزز و انسخ رابطها في ملف الورد.
      </div>
      <br />
      <div className="text-bold text-center">مهمة (1)</div>
      <div className="text-center">ضع عنوان للواقع المعزز في مجال تخصصك؟</div>
      <br />
      <div className="text-bold text-center">مهمة (2)</div>
      <div className="text-center">صياغة أهداف للواقع المعزز في ضوء العنوان السابق تحديده، وفي ضوء معايير صياغة الأهداف؟</div>
      <br />
      <div className="text-bold text-center">مهمة (3)</div>
      <div className="text-center">اقترح محتوى للواقع المعزز في ضوء العنوان الذي تم صياغته، ويحقق الأهداف التي تمت صياغتها.</div>
      <br />
      <div className="text-bold text-center">مهمة (4)</div>
      <div className="text-center">اقترح عدد من الوسائط المتعددة التي تتناسب مع العناصر السابقة للواقع المعزز.</div>
      <br />
      <div className="text-center">قم برفع الملف بعد اكتماله لمعلمك على لينك الفورم المخصص لذلك.</div>

      <div className="text-center text-red text-bold"><a href='https://forms.office.com/r/ubDtGtrbuH'>لإرسال ملف المهمة اضغط هنا</a></div>
    </div>

  </div>
  );
};

// Create the content element using the component
const unit_three = <UnitThree />;

// Export the content element
export default unit_three;
