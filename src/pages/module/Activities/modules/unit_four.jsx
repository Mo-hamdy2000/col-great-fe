import { useEffect, useContext } from 'react';
import { AuthContext } from "../../../../Components/Auth/AuthcontextProvider";

const UnitFour = () => {
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
      (function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="OtZ0n_vSZR3xWPJGEpNOe";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();
    `;

    const secondChatScript = `
      (function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="n32qYkn93Ol7MSW7zgzRk";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();
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
      <u className="text-red text-bold text-large text-center">
        مهام  الموديول الرابع
      </u>
      <br />
      <div className="text-bold">
        عزيزي الطالب / عزيزتي الطالبة انجز المهام الآتية:
        قم بإعداد فيديو يوضح خطوات إنشاء مشروع واقع معزز للعنوان الذي قمت باختياره في الموديول السابق باستخدام تطبيق Assemblr Studio من خلال إضافة شكل ثلاثى الابعاد، ثم اضف وصف للشكل السابق اضافته، ثم أضف صورة، ثم أضف فيديو، ثم أضف موسيقى، ثم احفظ المشروع و قم بعرض المشروع ثلاثى الابعاد فى الواقع الفعلى، ثم قم بنشر المشروع ومشاركته مع الاشخاص وتحديد صورة للمشروع، وقم بنشر المشروع بأستخدام QR code، وادراج علامة مخصصة (custom AR maker) لاظهار الواقع المعزز عليها
      </div>
      <br />
      <div className="text-center text-bold">مهمة (1)</div>
      <div className="text-center">إنشاء مشروع واقع معزز باستخدام تطبيق Assemblr Studio</div>
      <br />
      <div className="text-center text-bold">مهمة (2)</div>
      <div className="text-center">إضافة شكل ثلاثى الابعاد لمشروع الواقع المعزز؟</div>
      <br />
      <div className="text-center text-bold">مهمة (3)</div>
      <div className="text-center">اضف وصف للشكل السابق اضافته؟</div>
      <br />
      <div className="text-center text-bold">مهمة (4)</div>
      <div className="text-center">أضف صورة لمشروع الواقع المعزز؟</div>
      <br />
      <div className="text-center text-bold">مهمة (5)</div>
      <div className="text-center">أضف فيديو لمشروع الواقع المعزز؟</div>
      <br />
      <div className="text-center text-bold">مهمة (6)</div>
      <div className="text-center">أضف موسيقى لمشروع الواقع المعزز؟</div>
      <br />
      <div className="text-center text-bold">مهمة (7)</div>
      <div className="text-center">أحفظ مشروع الواقع المعزز؟</div>
      <br />
      <div className="text-center text-bold">مهمة (8)</div>
      <div className="text-center">اعرض مشروع الواقع المعزز ثلاثى الابعاد فى الواقع الفعلى؟</div>
      <br />
      <div className="text-center text-bold">مهمة (9)</div>
      <div className="text-center">انشر المشروع وشاركه مع الاشخاص وحدد صورة للمشروع</div>
      <br />
      <div className="text-center text-bold">مهمة (10)</div>
      <div className="text-center">انشر المشروع بأستخدام QR code.</div>
      <br />
      <div className="text-center text-bold">مهمة (11)</div>
      <div className="text-center">ادراج علامة مخصصة (custom AR maker) لاظهار الواقع المعزز عليها</div>
      <br />
      <div className="text-center text-red text-bold">قم برفع الملف بعد اكتماله لمعلمك على لينك الفورم المخصص لذلك</div>
      <div className="text-center text-red text-bold"><a href='https://forms.office.com/r/rM0sMGk6aL'>لإرسال ملف المهمة اضغط هنا</a></div>
      <br />
    </div>
  );
};

// Create the content element using the component
const unit_four = <UnitFour />;

// Export the content element
export default unit_four;
